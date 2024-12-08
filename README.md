## CoolerCalendar

FullCalendar 1.6.4 patch and revamp, using jQuery and Bootstrap.

## Table of Contents

1. [How to install](#install)
2. [How to use](#start)
2. [What's new](#new)
3. [Stacks and libraries](#stacks)

## <a name="install">How to install</a>
    
Clone the repository.

```sh
git clone https://github.com/cesarbrancalhao/CoolerCalendar.git
```
Done! Good to go.

*__If you want to use it offline__ you'll need to download the Bootstrap and jQuery packages and update the imports on index.html.*


## <a name="start">How to use</a>

To use the API example I provided;
Open the terminal on [server](./server/) folder.
Run:

```sh
npm i
node run server.js
```

You may want to integrate the Ajax calls to your own endpoints later.

## <a name="new">What's new</a>

From FullCalendar 1.6.4:

- Added forms to properly create and edit events.
- Added a help button explaining how events work.
- Added new event types.
- Changed event style and properties.
- Fixed problems with the events not being rendered on the correct places.
- Fixed resizing and responsivity bugs.
- Removed draggables (unwanted on this version).

Future changes:

- Add language options.
- Add example backend.

## <a name="stacks">Stacks and libraries</a>

- [jQuery 1.11.1](https://blog.jquery.com/2014/05/01/jquery-1-11-1-and-2-1-1-released/)
- [Bootstrap 3.3](https://getbootstrap.com/docs/3.3/)