declare module 'homeMaidApi' {
  export interface device {
    deviceId: string;
    deviceName: string;
    deviceType:
      | 'Hub'
      | 'Hub Plus'
      | 'Hub Mini'
      | 'Bot'
      | 'Curtain'
      | 'Plug'
      | 'Meter'
      | 'Humidifier'
      | 'Smart Fan';
    hubDeviceId: string;
  }

  export interface infraredRemote {
    deviceId: string;
    deviceName: string;
    remoteType:
      | 'Air Conditioner'
      | 'TV'
      | 'Light'
      | 'IPTV/Streamer'
      | 'Set Top Box'
      | 'DVD'
      | 'Fan'
      | 'Projector'
      | 'Camera'
      | 'Air Purifier'
      | 'Speaker'
      | 'Water Heater'
      | 'Vacuum Cleaner'
      | 'Others';
    hubDeviceId: string;
  }

  export interface response {
    statusCode: number;
    body?: {
      deviceList: device[];
      infraredRemoteList: infraredRemote[];
    };
    message: string;
  }
}
