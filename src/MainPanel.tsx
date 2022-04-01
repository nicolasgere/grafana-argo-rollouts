import React from 'react';
// import { PanelProps } from '@grafana/data';
// import { SimpleOptions } from 'types';
import { Alert, Badge, VerticalGroup } from '@grafana/ui';
import {RevisionCard} from './Components/Revision'
import {Result} from './Model/rollout'
export class MainPanel extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {}  ;
  }
  async componentDidMount(){
    const response = await fetch("http://localhost:3200/api/v1/rollouts/default/api/info/watch", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0",
        "Accept": "text/event-stream",
        "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    },
    "referrer": "http://localhost:3200/rollout/api",
    "method": "GET",
    "mode": "cors"
  });
    if(response == null || response.body == null){
      return
    }
    const reader = response.body.getReader();
    
    
      try{
        const { value } = await reader.read();
        
        if(value == undefined){
          return
        }
        const jsonString = Buffer.from(value).toString('utf8').replace('data:', '').trim()
        console.log('Received', jsonString);
      
       var ok = JSON.parse(jsonString).result as unknown as Result 
       console.log('PARSED', ok);
  
       this.setState({rollout: ok})
      } catch(err){

      }

    
  }
  render() {
    console.log("RENDER", this.state)
    const state = this.state as any
    if(state.rollout === undefined){
      return <div>loading</div>
    }
    let r = state.rollout as Result

    return (
      <div>
        <Alert title={`Status: ${r.status}`} severity={r.status ==  "Progressing" || r.status === "Paused" ?  'info' : 'success' }>
          <VerticalGroup>
            <div>Strategy: {r.strategy} </div>
            <span>Pods desired: {r.desired} Pods ready: {r.ready} Pods started: {r.current}</span>
            <div>Last deploy: 12 minutes ago</div>
          </VerticalGroup>
        </Alert>
        <h3>Running pipeline</h3>
        <Badge color='green' text='set 50%' icon='cube'></Badge> <span>----</span>
        <Badge color='orange' text='paused' icon='pause'></Badge><span>----</span>
        <Badge color='white' text='set 100%' icon='cube'></Badge>

        <h3>Revisions</h3>
        {
          r.replicaSets.map(replica =>{
            console.log(replica)
            if(!replica.pods){
              replica.pods = []
            }
          return  <RevisionCard role={replica.stable ? 'stable': replica.canary ? 'canary': ''} state={replica.status} revisionId={replica.revision.toString()} image={replica.images[0]} replicaSet={replica.objectMeta.name} pods={replica.pods.map((pod)=>{
              return {
                name: pod.objectMeta.name,
                state: pod.status,
              }
            })}></RevisionCard>

          })
        }
   
        
      </div>)
  }
}
// export const MainPanel: React.FC<Props> = ({ options, data, width, height }) => {
  
//   );
// };
