SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "a2/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.16"
    }
  },
  transpiler: "plugin-babel",
  meta: {
    "*.html": {
      "loader": "text"
    },
    "*.js": {
      "babelOptions": {
        "es2015": false
      }
    }
  },
  packages: {
    "a2": {
      "main": "main.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel",
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-es2015-typeof-symbol",
              "babel-plugin-angular2-annotations",
              "babel-plugin-transform-decorators-legacy",
              "babel-plugin-transform-class-properties",
              "babel-plugin-transform-flow-strip-types"
            ]
          }
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "@angular/common": "npm:@angular/common@2.3.0",
    "@angular/compiler": "npm:@angular/compiler@2.3.0",
    "@angular/core": "npm:@angular/core@2.3.0",
    "@angular/forms": "npm:@angular/forms@2.3.0",
    "@angular/http": "npm:@angular/http@2.3.0",
    "@angular/material": "npm:@angular/material@2.0.0-alpha.11",
    "@angular/platform-browser": "npm:@angular/platform-browser@2.3.0",
    "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic@2.3.0",
    "@angular/router": "npm:@angular/router@3.3.0",
    "@ngrx/core": "npm:@ngrx/core@1.2.0",
    "@ngrx/store": "npm:@ngrx/store@2.2.1",
    "@ngrx/store-devtools": "npm:@ngrx/store-devtools@3.2.2",
    "@ngrx/store-log-monitor": "npm:@ngrx/store-log-monitor@3.0.2",
    "assert": "npm:jspm-nodelibs-assert@0.2.0",
    "babel-plugin-angular2-annotations": "npm:babel-plugin-angular2-annotations@5.1.0",
    "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.19.0",
    "babel-plugin-transform-decorators-legacy": "npm:babel-plugin-transform-decorators-legacy@1.3.4",
    "babel-plugin-transform-es2015-typeof-symbol": "npm:babel-plugin-transform-es2015-typeof-symbol@6.18.0",
    "babel-plugin-transform-flow-strip-types": "npm:babel-plugin-transform-flow-strip-types@6.18.0",
    "babel-preset-es2015": "npm:babel-preset-es2015@6.18.0",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.1",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
    "constants": "npm:jspm-nodelibs-constants@0.2.0",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
    "css": "github:systemjs/plugin-css@0.1.32",
    "events": "npm:jspm-nodelibs-events@0.2.0",
    "fs": "npm:jspm-nodelibs-fs@0.2.0",
    "hammerjs": "npm:hammerjs@2.0.8",
    "material-design-icons-iconfont": "npm:material-design-icons-iconfont@3.0.2",
    "ng2-vs-for": "npm:ng2-vs-for@1.1.1",
    "ngrx-store-localstorage": "npm:ngrx-store-localstorage@0.1.5",
    "os": "npm:jspm-nodelibs-os@0.2.0",
    "path": "npm:jspm-nodelibs-path@0.2.1",
    "process": "npm:jspm-nodelibs-process@0.2.0",
    "reflect-metadata": "npm:reflect-metadata@0.1.8",
    "rxjs": "npm:rxjs@5.0.0-rc.4",
    "speakingurl": "npm:speakingurl@10.0.0",
    "stream": "npm:jspm-nodelibs-stream@0.2.0",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
    "text": "github:systemjs/plugin-text@0.0.9",
    "timers": "npm:jspm-nodelibs-timers@0.2.0",
    "util": "npm:jspm-nodelibs-util@0.2.1",
    "uuid": "npm:uuid@2.0.3",
    "vm": "npm:jspm-nodelibs-vm@0.2.0",
    "zone.js": "npm:zone.js@0.7.2"
  },
  packages: {
    "npm:babel-plugin-angular2-annotations@5.1.0": {
      "map": {
        "babel-generator": "npm:babel-generator@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-function-name@6.9.0": {
      "map": {
        "babel-helper-function-name": "npm:babel-helper-function-name@6.18.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-sticky-regex@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-helper-regex": "npm:babel-helper-regex@6.18.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-literals@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-computed-properties@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-template": "npm:babel-template@6.16.0",
        "babel-helper-define-map": "npm:babel-helper-define-map@6.18.0"
      }
    },
    "npm:babel-plugin-transform-es2015-duplicate-keys@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-plugin-check-es2015-constants@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-spread@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-object-super@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-helper-replace-supers": "npm:babel-helper-replace-supers@6.18.0"
      }
    },
    "npm:babel-plugin-transform-es2015-arrow-functions@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-unicode-regex@6.11.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-helper-regex": "npm:babel-helper-regex@6.18.0",
        "regexpu-core": "npm:regexpu-core@2.0.0"
      }
    },
    "npm:babel-plugin-transform-es2015-block-scoped-functions@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-template-literals@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-plugin-transform-decorators-legacy@1.3.4": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-template": "npm:babel-template@6.16.0",
        "babel-plugin-syntax-decorators": "npm:babel-plugin-syntax-decorators@6.13.0"
      }
    },
    "npm:babel-template@6.16.0": {
      "map": {
        "babel-traverse": "npm:babel-traverse@6.20.0",
        "babel-types": "npm:babel-types@6.20.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "lodash": "npm:lodash@4.17.2",
        "babylon": "npm:babylon@6.14.1"
      }
    },
    "npm:babel-messages@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:regexpu-core@2.0.0": {
      "map": {
        "regjsparser": "npm:regjsparser@0.1.5",
        "regjsgen": "npm:regjsgen@0.2.0",
        "regenerate": "npm:regenerate@1.3.2"
      }
    },
    "npm:regjsparser@0.1.5": {
      "map": {
        "jsesc": "npm:jsesc@0.5.0"
      }
    },
    "npm:chalk@1.1.3": {
      "map": {
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "supports-color": "npm:supports-color@2.0.0",
        "ansi-styles": "npm:ansi-styles@2.2.1",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "has-ansi": "npm:has-ansi@2.0.0"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:is-finite@1.0.2": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.1"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.2.2"
      }
    },
    "npm:buffer@4.9.1": {
      "map": {
        "base64-js": "npm:base64-js@1.2.0",
        "ieee754": "npm:ieee754@1.1.8",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "randombytes": "npm:randombytes@2.0.3",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "create-hmac": "npm:create-hmac@1.1.4",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "browserify-sign": "npm:browserify-sign@4.0.0"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.8"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "randombytes": "npm:randombytes@2.0.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "bn.js": "npm:bn.js@4.11.6",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "bn.js": "npm:bn.js@4.11.6",
        "miller-rabin": "npm:miller-rabin@4.0.0"
      }
    },
    "npm:pbkdf2@3.0.9": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "inherits": "npm:inherits@2.0.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.3.2",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "browserify-aes": "npm:browserify-aes@1.0.6"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:cipher-base@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.3.2"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "bn.js": "npm:bn.js@4.11.6"
      }
    },
    "npm:elliptic@6.3.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.3",
        "brorand": "npm:brorand@1.0.6",
        "hash.js": "npm:hash.js@1.0.3"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.0.6"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "asn1.js": "npm:asn1.js@4.9.0"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:timers-browserify@1.4.2": {
      "map": {
        "process": "npm:process@0.11.9"
      }
    },
    "npm:jspm-nodelibs-os@0.2.0": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:jspm-nodelibs-timers@0.2.0": {
      "map": {
        "timers-browserify": "npm:timers-browserify@1.4.2"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.0": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.0": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.0": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "npm:babel-preset-es2015@6.18.0": {
      "map": {
        "babel-plugin-transform-es2015-typeof-symbol": "npm:babel-plugin-transform-es2015-typeof-symbol@6.18.0",
        "babel-plugin-transform-es2015-shorthand-properties": "npm:babel-plugin-transform-es2015-shorthand-properties@6.18.0",
        "babel-plugin-transform-es2015-modules-systemjs": "npm:babel-plugin-transform-es2015-modules-systemjs@6.19.0",
        "babel-plugin-transform-es2015-modules-amd": "npm:babel-plugin-transform-es2015-modules-amd@6.18.0",
        "babel-plugin-transform-es2015-modules-umd": "npm:babel-plugin-transform-es2015-modules-umd@6.18.0",
        "babel-plugin-transform-es2015-block-scoping": "npm:babel-plugin-transform-es2015-block-scoping@6.20.0",
        "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.18.0",
        "babel-plugin-transform-es2015-destructuring": "npm:babel-plugin-transform-es2015-destructuring@6.19.0",
        "babel-plugin-transform-es2015-parameters": "npm:babel-plugin-transform-es2015-parameters@6.18.0",
        "babel-plugin-transform-es2015-computed-properties": "npm:babel-plugin-transform-es2015-computed-properties@6.8.0",
        "babel-plugin-transform-es2015-sticky-regex": "npm:babel-plugin-transform-es2015-sticky-regex@6.8.0",
        "babel-plugin-transform-es2015-object-super": "npm:babel-plugin-transform-es2015-object-super@6.8.0",
        "babel-plugin-transform-es2015-block-scoped-functions": "npm:babel-plugin-transform-es2015-block-scoped-functions@6.8.0",
        "babel-plugin-transform-es2015-unicode-regex": "npm:babel-plugin-transform-es2015-unicode-regex@6.11.0",
        "babel-plugin-transform-es2015-literals": "npm:babel-plugin-transform-es2015-literals@6.8.0",
        "babel-plugin-transform-es2015-spread": "npm:babel-plugin-transform-es2015-spread@6.8.0",
        "babel-plugin-transform-es2015-arrow-functions": "npm:babel-plugin-transform-es2015-arrow-functions@6.8.0",
        "babel-plugin-check-es2015-constants": "npm:babel-plugin-check-es2015-constants@6.8.0",
        "babel-plugin-transform-es2015-function-name": "npm:babel-plugin-transform-es2015-function-name@6.9.0",
        "babel-plugin-transform-es2015-template-literals": "npm:babel-plugin-transform-es2015-template-literals@6.8.0",
        "babel-plugin-transform-es2015-duplicate-keys": "npm:babel-plugin-transform-es2015-duplicate-keys@6.8.0",
        "babel-plugin-transform-regenerator": "npm:babel-plugin-transform-regenerator@6.20.0",
        "babel-plugin-transform-es2015-for-of": "npm:babel-plugin-transform-es2015-for-of@6.18.0",
        "babel-plugin-transform-es2015-classes": "npm:babel-plugin-transform-es2015-classes@6.18.0"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.1": {
      "map": {
        "buffer": "npm:buffer@4.9.1"
      }
    },
    "npm:babel-plugin-transform-class-properties@6.19.0": {
      "map": {
        "babel-helper-function-name": "npm:babel-helper-function-name@6.18.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-template": "npm:babel-template@6.16.0",
        "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.13.0"
      }
    },
    "npm:babel-plugin-transform-es2015-typeof-symbol@6.18.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-plugin-transform-flow-strip-types@6.18.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.18.0"
      }
    },
    "npm:babel-plugin-transform-es2015-shorthand-properties@6.18.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-modules-amd@6.18.0": {
      "map": {
        "babel-template": "npm:babel-template@6.16.0",
        "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.18.0",
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-modules-umd@6.18.0": {
      "map": {
        "babel-template": "npm:babel-template@6.16.0",
        "babel-plugin-transform-es2015-modules-amd": "npm:babel-plugin-transform-es2015-modules-amd@6.18.0",
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-block-scoping@6.20.0": {
      "map": {
        "babel-template": "npm:babel-template@6.16.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "lodash": "npm:lodash@4.17.2",
        "babel-traverse": "npm:babel-traverse@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-modules-commonjs@6.18.0": {
      "map": {
        "babel-template": "npm:babel-template@6.16.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-plugin-transform-strict-mode": "npm:babel-plugin-transform-strict-mode@6.18.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-parameters@6.18.0": {
      "map": {
        "babel-template": "npm:babel-template@6.16.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.18.0",
        "babel-helper-call-delegate": "npm:babel-helper-call-delegate@6.18.0",
        "babel-traverse": "npm:babel-traverse@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-destructuring@6.19.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-helper-function-name@6.18.0": {
      "map": {
        "babel-template": "npm:babel-template@6.16.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.18.0",
        "babel-traverse": "npm:babel-traverse@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-runtime@6.20.0": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.10.1",
        "core-js": "npm:core-js@2.4.1"
      }
    },
    "npm:babel-plugin-transform-es2015-modules-systemjs@6.19.0": {
      "map": {
        "babel-template": "npm:babel-template@6.16.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-helper-hoist-variables": "npm:babel-helper-hoist-variables@6.18.0"
      }
    },
    "npm:babel-generator@6.20.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "lodash": "npm:lodash@4.17.2",
        "babel-messages": "npm:babel-messages@6.8.0",
        "detect-indent": "npm:detect-indent@4.0.0",
        "babel-types": "npm:babel-types@6.20.0",
        "source-map": "npm:source-map@0.5.6",
        "jsesc": "npm:jsesc@1.3.0"
      }
    },
    "npm:babel-helper-call-delegate@6.18.0": {
      "map": {
        "babel-traverse": "npm:babel-traverse@6.20.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0",
        "babel-helper-hoist-variables": "npm:babel-helper-hoist-variables@6.18.0"
      }
    },
    "npm:babel-helper-get-function-arity@6.18.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-plugin-transform-strict-mode@6.18.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-plugin-transform-es2015-for-of@6.18.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0"
      }
    },
    "npm:babel-traverse@6.20.0": {
      "map": {
        "babel-messages": "npm:babel-messages@6.8.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0",
        "lodash": "npm:lodash@4.17.2",
        "babylon": "npm:babylon@6.14.1",
        "globals": "npm:globals@9.14.0",
        "babel-code-frame": "npm:babel-code-frame@6.20.0",
        "invariant": "npm:invariant@2.2.2",
        "debug": "npm:debug@2.3.3"
      }
    },
    "npm:babel-plugin-transform-regenerator@6.20.0": {
      "map": {
        "regenerator-transform": "npm:regenerator-transform@0.9.8"
      }
    },
    "npm:babel-types@6.20.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "lodash": "npm:lodash@4.17.2",
        "to-fast-properties": "npm:to-fast-properties@1.0.2",
        "esutils": "npm:esutils@2.0.2"
      }
    },
    "npm:rxjs@5.0.0-rc.4": {
      "map": {
        "symbol-observable": "npm:symbol-observable@1.0.4"
      }
    },
    "npm:regenerator-transform@0.9.8": {
      "map": {
        "babel-types": "npm:babel-types@6.20.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "private": "npm:private@0.1.6"
      }
    },
    "npm:babel-plugin-transform-es2015-classes@6.18.0": {
      "map": {
        "babel-messages": "npm:babel-messages@6.8.0",
        "babel-helper-function-name": "npm:babel-helper-function-name@6.18.0",
        "babel-template": "npm:babel-template@6.16.0",
        "babel-traverse": "npm:babel-traverse@6.20.0",
        "babel-types": "npm:babel-types@6.20.0",
        "babel-helper-replace-supers": "npm:babel-helper-replace-supers@6.18.0",
        "babel-helper-define-map": "npm:babel-helper-define-map@6.18.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-helper-optimise-call-expression": "npm:babel-helper-optimise-call-expression@6.18.0"
      }
    },
    "npm:babel-helper-hoist-variables@6.18.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:detect-indent@4.0.0": {
      "map": {
        "repeating": "npm:repeating@2.0.1"
      }
    },
    "npm:babel-helper-replace-supers@6.18.0": {
      "map": {
        "babel-messages": "npm:babel-messages@6.8.0",
        "babel-template": "npm:babel-template@6.16.0",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-traverse": "npm:babel-traverse@6.20.0",
        "babel-types": "npm:babel-types@6.20.0",
        "babel-helper-optimise-call-expression": "npm:babel-helper-optimise-call-expression@6.18.0"
      }
    },
    "npm:babel-helper-define-map@6.18.0": {
      "map": {
        "lodash": "npm:lodash@4.17.2",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0",
        "babel-helper-function-name": "npm:babel-helper-function-name@6.18.0"
      }
    },
    "npm:babel-helper-regex@6.18.0": {
      "map": {
        "lodash": "npm:lodash@4.17.2",
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:babel-code-frame@6.20.0": {
      "map": {
        "esutils": "npm:esutils@2.0.2",
        "chalk": "npm:chalk@1.1.3",
        "js-tokens": "npm:js-tokens@2.0.0"
      }
    },
    "npm:babel-helper-optimise-call-expression@6.18.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.20.0",
        "babel-types": "npm:babel-types@6.20.0"
      }
    },
    "npm:readable-stream@2.2.2": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "string_decoder": "npm:string_decoder@0.10.31",
        "inherits": "npm:inherits@2.0.3",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "core-util-is": "npm:core-util-is@1.0.2"
      }
    },
    "npm:repeating@2.0.1": {
      "map": {
        "is-finite": "npm:is-finite@1.0.2"
      }
    },
    "npm:invariant@2.2.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.0"
      }
    },
    "npm:debug@2.3.3": {
      "map": {
        "ms": "npm:ms@0.7.2"
      }
    },
    "npm:loose-envify@1.3.0": {
      "map": {
        "js-tokens": "npm:js-tokens@2.0.0"
      }
    },
    "npm:sha.js@2.4.8": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:asn1.js@4.9.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:@angular/material@2.0.0-alpha.11": {
      "map": {
        "@types/hammerjs": "npm:@types/hammerjs@2.0.33"
      }
    }
  }
});
