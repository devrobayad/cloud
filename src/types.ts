export interface Solution {
  id: string;
  title: string;
  image: string;
  link: string;
}

export interface Project {
  id: number;
  title: string;
  category: "all" | "networking" | "cctv" | "sound" | "fiber" | "boardroom";
  categoryLabel: string;
  images: string[];
  description: string;
  client: string;
  location: string;
}

export interface Brand {
  id: string;
  name: string;
  logoType: 'text' | 'cisco' | 'dell' | 'fortinet' | 'netgear' | 'hikvision' | 'dahua' | 'lenovo' | 'bosch' | 'mikrotik' | 'ruijie' | 'witek' | 'ubiquiti' | 'grandstream' | 'tiandy' | 'bdcom';
  primaryColor: string;
}

export interface Client {
  id: string;
  name: string;
  logoText: string;
  subtitle?: string;
  bgColor?: string;
  textColor?: string;
}

export interface Stat {
  value: string;
  label: string;
}
