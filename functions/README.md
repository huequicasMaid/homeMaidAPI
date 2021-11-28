# homeMaidAPI

<p align='center'>
  Home electronics manager with firebase.<br>
  <img src='https://user-images.githubusercontent.com/40014236/143765315-6f508d69-709f-43b6-85ec-35c274c9655c.png'>
</p>

# summary

This api implementation is [switchBotApi](https://github.com/OpenWonderLabs/SwitchBotAPI) wrapper with original authentication that use token.  

API document is [here](https://github.com/huequicasMaid/homeMaidAPI/tree/main/functions/README.md).

# get started

1. `$ yarn` at `[ProjectRoot]/functions`
2. Run `$ firebase functions:config:set` for create switchBotAPI token, sceneId, etc.
3. For start local firebase emulator, `$ yarn serve`.  
  > Note: Before use emulator, you must setup firebase emulator environment.  
  > To setup emulators, see [official guide](https://firebase.google.com/docs/emulator-suite).
4. `$ yarn deploy` to start deploy functions.

# token

When use this api(**not exclusive production**), you must generate api token.  
To generate that, see [admin/README.md](https://github.com/huequicasMaid/homeMaidAPI/tree/main/admin/README.md). 
