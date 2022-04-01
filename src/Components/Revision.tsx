import { Card, Collapse, IconButton, Tag, VerticalGroup } from '@grafana/ui';
import React,{ useState } from 'react';

export function RevisionCard({replicaSet,revisionId, state, role, image, pods}:{pods: Array<{
    name:string,
    state: string
}>,replicaSet: string,image:string, revisionId:string, state:string, role:string}) {
    const [open, setOpen] = useState(role? true: false);
    return (

    <Collapse

            collapsible
            label={`Revision ${revisionId}`}
            isOpen={open}
            onToggle={() => setOpen(!open)}
          >
            <Card>
                <Card.Tags>
                { 
                {
                    'Healthy': <Tag name="Healthy" colorIndex={5} />,
                    'ScaledDown': <Tag name="Scaled down" colorIndex={6} />,
                    }[state]
                    }
                    
                &nbsp;
                { 
                    role == "stable" ?  <Tag name="Stable" colorIndex={1} />: role == 'canary'? <Tag name="Canary" colorIndex={2} />: undefined
                    }
                </Card.Tags>
                <Card.Meta>
                    <VerticalGroup>
                    <div>Image: {image}</div>
                    <div>ReplicaSet: {replicaSet}</div>
                    <div>
                        {
                            pods.map((pod)=>{
                                if(pod.state == "Running"){
                                    return <IconButton tooltip={pod.name} size="lg" variant="secondary" name="cube"></IconButton>
                                }
                                return
                            })
                        }
                    </div>
                    </VerticalGroup>
                </Card.Meta>
                </Card>

    </Collapse>
  
  );
}
