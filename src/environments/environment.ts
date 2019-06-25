// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCcuheP2MixfSbKQyJ1BSLe1NFjqYx2Y24',
    authDomain: 'lompaz-d4bb8.firebaseapp.com',
    databaseURL: 'https://lompaz-d4bb8.firebaseio.com',
    projectId: 'lompaz-d4bb8',
    storageBucket: 'lompaz-d4bb8.appspot.com',
    messagingSenderId: '498232659501'
  },
  mercadoPagoProxyBaseUrl: 'http://localhost:8080'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
