export interface ObjectMeta {
  name: string;
  namespace: string;
  uid: string;
  resourceVersion: string;
  creationTimestamp: Date;
}

export interface ObjectMeta2 {
  name: string;
  namespace: string;
  uid: string;
  creationTimestamp: Date;
}

export interface ObjectMeta3 {
  name: string;
  namespace: string;
  uid: string;
  creationTimestamp: Date;
}

export interface Pod {
  objectMeta: ObjectMeta3;
  status: string;
  icon: string;
  ready: string;
}

export interface ReplicaSet {
  objectMeta: ObjectMeta2;
  status: string;
  icon: string;
  revision: number;
  stable: boolean;
  canary: boolean;
  replicas: number;
  available: number;
  images: string[];
  pods: Pod[];
}

export interface Container {
  name: string;
  image: string;
}

export interface Pause {
  duration: string;
}

export interface Step {
  setWeight: number;
  pause: Pause;
}

export interface Result {
  objectMeta: ObjectMeta;
  status: string;
  icon: string;
  strategy: string;
  step: string;
  setWeight: string;
  actualWeight: string;
  ready: number;
  current: number;
  desired: number;
  updated: number;
  available: number;
  restartedAt: string;
  generation: string;
  replicaSets: ReplicaSet[];
  containers: Container[];
  steps: Step[];
}

export interface RolloutResult {
  result: Result;
}
