# three-of-game

Home task for Take Away company. Backend for the app is [here](https://github.com/takeaway/scoober-fe-challenge-starter)

During the work noticed couple if strange points:
1) `Number` value from sockets firstly is string, then a number. I believe that it's better to make it one type
2) Something strange happen with `randomNumber` event - I'm not sure that it works correctly because it may send you 
the same number for a very long time. Not sure what from teh FE perspective I may do. Expect fix the BE side :-)
3) I think I know how to make `letsPlay` and `activateYourTurn` events more usable and comfy for FE side. 

In any case: this application is written with CRA. So to start the code run `npm run start`
