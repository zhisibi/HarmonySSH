import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';

export default class EntryAbility extends UIAbility {
  onCreate(want, launchParam) {
    console.log('[HarmonySSH] EntryAbility onCreate');
  }

  onDestroy() {
    console.log('[HarmonySSH] EntryAbility onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    console.log('[HarmonySSH] EntryAbility onWindowStageCreate');
    windowStage.loadContent('pages/Login');
  }

  onWindowStageDestroy() {
    console.log('[HarmonySSH] EntryAbility onWindowStageDestroy');
  }

  onForeground() {
    console.log('[HarmonySSH] EntryAbility onForeground');
  }

  onBackground() {
    console.log('[HarmonySSH] EntryAbility onBackground');
  }
}
