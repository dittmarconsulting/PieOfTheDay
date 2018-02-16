## Installation

#### Pre-Install

1. Add Redux extension to Chrome
2. Install Stand-alone Remote debugger on OSX using brew

```
brew update && brew cask install react-native-debugger

```

#### npm Dependency Installation

```
npm install
```
The script `postinstall` will be invoked, which changes the remote debugger to the Stand-alone debugger

#### Open Stand-alone Remote debugger

 While Simulator is running use Command+D to open the developer console and click on `Remote JS Debugging` to open the Stand-alone Remote Debugger1

## App description

#### Pie List page

Here is the list of all pies displayed. Each list item shows an image of the related pie type, the name of the pie, the price & quantity and the store information.

The rating of the store is displayed in form of a number next to the star. There is

Furthermore, there is an extra feature that shows whether the "Pie of the day" is in fact the cheapest pie. If yes a "green thumb-up" is shown and if not a "red thumb-down" is displayed.

The entire "pie card" is clickable. Once selected the user will be redirected to the store information page.

On the upper right corner of the header the user can switch the sorting either from cheapest to most expensive price or visa versa

In the middle section of the header is the search text field where the user can search for a pie name.

#### Store information page

Here is the store information are shown together with the static map of the location of the store.

![alt text](https://github.com/dittmarconsulting/PieOfTheDay/blob/master/src/assets/images/pod.png)
