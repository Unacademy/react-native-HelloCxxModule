#include "HelloCxxModule.h"
#include "cxxreact/JsArgumentHelpers.h"
#include "cxxreact/Instance.h"
#include <string>
#include <cstdio>
#include <string>
#include <cstring>
#include <cstdlib>
#include <zlib.h>
#include <zconf.h>
#include "glog/logging.h"

using namespace std;

HelloCxxModule::HelloCxxModule() {}

std::string HelloCxxModule::getName() {
  return "HelloCxxModule";
}

auto HelloCxxModule::getConstants() -> std::map<std::string, folly::dynamic> {
  return {
      {"one", 1}, {"two", 2}, {"animal", "fox"},
  };
}

bool gzipInflate( const std::string& compressedBytes, std::string& uncompressedBytes ) {
    if ( compressedBytes.size() == 0 ) {
        uncompressedBytes = compressedBytes ;
        return true ;
    }

    uncompressedBytes.clear() ;

    unsigned full_length = compressedBytes.size() ;
    unsigned half_length = compressedBytes.size() / 2;

    unsigned uncompLength = full_length ;
    char* uncomp = (char*) calloc( sizeof(char), uncompLength );

    z_stream strm;
    strm.next_in = (Bytef *) compressedBytes.c_str();
    strm.avail_in = compressedBytes.size() ;
    strm.total_out = 0;
    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;

    bool done = false ;

    if (inflateInit2(&strm, (16+MAX_WBITS)) != Z_OK) {
        free( uncomp );
        return false;
    }

    while (!done) {
        // If our output buffer is too small
        if (strm.total_out >= uncompLength ) {
            // Increase size of output buffer
            char* uncomp2 = (char*) calloc( sizeof(char), uncompLength + half_length );
            memcpy( uncomp2, uncomp, uncompLength );
            uncompLength += half_length ;
            free( uncomp );
            uncomp = uncomp2 ;
        }

        strm.next_out = (Bytef *) (uncomp + strm.total_out);
        strm.avail_out = uncompLength - strm.total_out;

        // Inflate another chunk.
        int err = inflate (&strm, Z_SYNC_FLUSH);
        if (err == Z_STREAM_END) done = true;
        else if (err != Z_OK)  {
            break;
        }
    }

    if (inflateEnd (&strm) != Z_OK) {
        free( uncomp );
        return false;
    }

    for ( size_t i=0; i<strm.total_out; ++i ) {
        uncompressedBytes += uncomp[ i ];
    }
    free( uncomp );
    return true ;
}

auto HelloCxxModule::getMethods() -> std::vector<Method> {
  return {
      Method("foo", [](folly::dynamic args, Callback cb) { cb({"foo"}); }),
      Method("test", [](folly::dynamic args, Callback cb) { cb({"sai"}); }),
      Method("gzipUncompress", [](folly::dynamic args, Callback cb) {
          std::string a =  facebook::xplat::jsArgAsString(args, 0);
          std::string decompressed_data = "";
          gzipInflate(a, decompressed_data);
            int j=0;
          for(int i=0;i<2054857;) {
              i++;
              j+=2;
             decompressed_data += "sdfsdfaaaa";
          }
          cb({decompressed_data});
      }),
      Method("bar",
             [this]() {
               if (auto reactInstance = getInstance().lock()) {
                 reactInstance->callJSFunction(
                     "RCTDeviceEventEmitter", "emit",
                     folly::dynamic::array(
                         "appStateDidChange",
                         folly::dynamic::object("app_state", "active")));
               }
             }),
  };
}

extern "C" HelloCxxModule* createHelloCxxModule() {
  return new HelloCxxModule();
}
