# Config Creator Front

Provider the front-end for the Config Creator solution.

Config Creator is a software that allows to draw customized templates of configuration and create
configuration based on these templates. Features:

- CRUD for templates that can include base types (text, textArea, number, toggle and list);
- Create projects that includes Items and Collections of resources;
- Items can be base types and/or templates;
- Collections are lists of base types or templates.


## TODO

- Create a page to list items from collections;
- Improve list border formatting when inside templates;
- Add export/generate project configuration feature
  - Async lambda that generates the JSON configuration
- Add mailbox feature
- Add admin panel to allow CRUD over users
  - Add permissions in the backend.
- Add image component
- Add binary component
- Add dropdown component
- Disallow template loop
- Disallow removing templates that are included in other templates
- Use skeleton to wait for data loading
- Add option to "inline" templates that only contains a list
  - inlining a template will add its value without a key when exporting.
  - This way, we can create a list of a inline template resulting in a list of lists (a matrix)
