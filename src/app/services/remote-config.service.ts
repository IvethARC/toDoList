import { Injectable } from '@angular/core';
import {
  getRemoteConfig,
  fetchAndActivate,
  getBoolean,
} from 'firebase/remote-config';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  private remoteConfig = getRemoteConfig(initializeApp(environment.firebase));

  constructor() {
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 3600000,
      fetchTimeoutMillis: 60000,
    };
  }

  async load(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
      console.log('✅ Remote Config activado');
    } catch (error) {
      console.warn('⚠️ Error al activar Remote Config', error);
    }
  }

  get showCompletedTasks(): boolean {
    return getBoolean(this.remoteConfig, 'showCompletedTasks');
  }
}
