/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';

const spyFunction = msg => {
  if (msg.module === 'RCTDeviceEventEmitter') {
    console.log(msg);
  }
};

MessageQueue.spy(spyFunction);

const App = () => {
  
  submit = (uri) => {
    //NativeModules.HelloCxxModule.foo(r => console.log('foo r', r));
    //NativeModules.HelloCxxModule.bar();
    this.time = Date.now();
    console.log("--LoadinTime--EventsStart", Date.now())
    const headers = {  
      method: 'GET',
      headers: {
        'Accept-Encoding': 'identity',
      }
    };
    fetch(uri)
    .then((response) => response.json())
    .then((response) => {
      console.log("--LoadinTime--EventsStartJSONcompleteFetch", Date.now() - this.time)
      console.log("--LoadinTime--EventsStartJSONcompleteFetchResponse", response[0][0])
      //this.parseEventsResponse(response)
      //console.log("--LoadinTime--EventsStartParsedJson", Date.now() - this.time)
      //this.time = Date.now()
    }).catch((error) => {
    })
  }

  parseEventsResponse = (response) => {

  }

  submitNative = (uri) => {
    //NativeModules.HelloCxxModule.foo(r => console.log('foo r', r));
    //NativeModules.HelloCxxModule.bar();
    this.time = Date.now();
    console.log("--LoadinTime--EventsStart", Date.now())
    NativeModules.Activity.getEventsData(uri, (response) => {
      console.log("--LoadinTime--EventsStartresponse", response)
      this.parseEventsResponse(response)
      console.log("--LoadinTime--EventsStartJSONcompleteNative", Date.now() - this.time)
      //this.parseEventsResponse(newResponse)
    });
  }

  fetchData = (uri) => {
    this.time = Date.now();
    console.log("--LoadinTime--EventsStart", Date.now())
    var XHR = new XMLHttpRequest();
    XHR.open('GET', uri, true);
    //XHR.responseType = "arraybuffer";
    XHR.setRequestHeader("Accept-Encoding", "gzip")
    XHR.onloadend =  () => {
      let arb = XHR.response;
      console.log("--LoadinTime--EventsStartresponse", arb)
      console.log("--LoadinTime--EventsStartJSONcompleteXHR", Date.now() - this.time)
      //const base64 = atob(arb);
          let a = new Uint8Array(arb);
          var CHUNK_SZ = 0x8000;
          var c = [];
          for (var i=0; i < a.length; i+=CHUNK_SZ) {
            c.push(String.fromCharCode.apply(null, a.subarray(i, i+CHUNK_SZ)));
          }
          // let bas64 = btoa(c.join(""));
          // let strData  = atob(bas64);
          // this.time = Date.now();
      NativeModules.HelloCxxModule.gzipUncompress("fdjhg", r => {
        console.log('--LoadinTimeUncompressed', r.length);
        console.log('--LoadinTimeUncompressedTime', Date.now() - this.time);
      });
      //this.parseEventsResponse(JSON.parse(this.utftoarray(data)));
    };
    XHR.send(null)
  }

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <Button
              title="Press me"
              onPress={() => this.submit("https://player.uacdn.net/lesson-raw/BVVQYYKEZIMW454HT145/data.json")}
            />

            <Button
              title="Press me Native call"
              onPress={() => this.submitNative("https://player.uacdn.net/lesson-raw/BVVQYYKEZIMW454HT145/data.json")}
            />
            <Button
              title="Press me XHR call"
              onPress={() => this.fetchData("https://player.uacdn.net/lesson-raw/BVVQYYKEZIMW454HT145/data.json")}
            />
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
