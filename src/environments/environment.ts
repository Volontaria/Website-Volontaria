// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url_base_api: 'http://localhost:8000',
  paths_api: {
    activation: '/users/activate',
    authentication: '/authentication',
    cells: '/volunteer/cells',
    cycles: '/volunteer/cycles',
    events: '/volunteer/events',
    participations: '/volunteer/participations',
    profile: '/profile',
    tasktypes: '/volunteer/tasktypes',
    users: '/users'
  }
};
