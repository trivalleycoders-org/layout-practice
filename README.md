# trivalleycoders
Tri-Valley Coders website
## Directory Structure
Structure of project is more for a React project as we plan to migrate to React once the team is ready.
### Top Level
/docs = project documentation
/src = the application/site
### /src
```
/app
    /components // *.js for application
    /lib // utilities
    /public // distribution package
           /img // *.jpg, *.png
    /styles // *.css
    /templates // *.html
    index.js // loads /components/index.js
```
## Install & Run
```
$ git clone https://github.com/klequis/trivalleycoders.git
$ cd trivalleycoders/src
$ npm install
$ git branch *branch-name*
$ git checkout *branch-name*
$ npm start
````
