# url-shortener-ai
Recreating [url-shortener](https://github.com/AntoDono/url-shortener) using Refine.dev AI.

### The folder in this repo contains the project built by the AI.

## Prompts

### Prompt Structure
- Goal/Mission 
- Structure/Details
- Warning/Important Guidelines

### Mockdata and Mockauth.
```
Goal: Create an URL Shortening CRUD app.

Features:
- CRUD (Create, Read, Update, Delete) URLs.
- User can input an alias, and the original URL. 
- When the alias URL is visited, it is redirected to the original URL.

Authentication:
- Simple Email/Password Authentication
- Registration account without verifying email.

Database
- Using localstorage as database.
- There should be two table(s): links, users
- Users:
    + email
    + password
- Link fields:
    + accessed (counter of visited)
    + url
    + user_id (uuid)
    + alias (link alias)
    + access_log (json array of accesss entries. E.g [{ip:..., user_agent:... }, ...])

IMPORTANT:
- Use mockdata provider for the database.
- New urls should be added to the database mockdata.
```

Using this prompt and ~18 exchanges, a working version of url-shortener was created.