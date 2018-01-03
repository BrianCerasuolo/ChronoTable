// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAJ5HYDZQ2hYdekX153n8INhF8wUIgoa9M",
    authDomain: "chronotable.firebaseapp.com",
    databaseURL: "https://chronotable.firebaseio.com",
    projectId: "chronotable",
    storageBucket: "chronotable.appspot.com",
    messagingSenderId: "816339104091"
  }
};
