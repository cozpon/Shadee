import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

class Terms extends Component {
  render() {
    return (
        <ScrollView>
          <Text style={{textAlign: 'left'}}>
          {`
Ownership of Application; Agreement to Terms of Use These Terms and Conditions of Use (the "Terms of Use") apply to the Shade mobile app, and all associated sites linked to www.shadeapp.com by the Backyard Boiz, its subsidiaries and affiliates, including the Backyard Boiz sites around the world (collectively, the "App"). The App is the property of ByardBoiZ Inc. ("ByardBoiZ") and its licensors.

BY USING THE APP, YOU AGREE TO THESE TERMS OF USE; IF YOU DO NOT AGREE, DO NOT USE THE APP.

Backyard Boiz reserves the right, at its sole discretion, to change, modify,
add or remove portions of these Terms of Use, at any time.
It is your responsibility to check these Terms of Use periodically for changes.
Your continued use of the Shade App following the posting of changes will mean that you accept and agree
to the changes.
As long as you comply with these Terms of Use, Backyard Boiz grants you a personal, non-exclusive, non-transferable,
limited privilege to enter and use the Shade App.

We accept no responsibility and allow no legal recourse to come back to us, our associates, our investors or any one we know.

We are a morally green company, the Shade App therein and accepted to by the United States Application Computer Science Committee ("USACSC")
accepts no responsibility or legal recourse to the user's content or content submitted by users of the Shade App.

The Backyard Boiz created the Shade App as a tool, what the user's use of the Shade App is entirely to their discretion.
The Backyard Boiz do not condone cyber bullying and donate 1% of all profits to Anti-Cyber-Bulling charities

`}
          </Text>
        </ScrollView>
    )
  }
}


export default Terms;