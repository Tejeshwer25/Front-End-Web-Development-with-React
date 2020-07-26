import React from 'react';
import {Media} from 'reactstrap';


function RenderLeader(props) {

    const leadlist = props.leader.map((leaders) => {
        return (
            <div key={leaders.id} className="col-12 mt-5">
                <Media tag="li">
                    <Media left middle>
                        <Media object src={leaders.image} alt={leaders.name} />
                    </Media>
                    <Media body className="ml-5">
                        <Media heading>{leaders.name}</Media>
                        <p>{leaders.description}</p>
                    </Media>
                </Media>
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <Media list>
                    {leadlist}
                </Media>
            </div>
        </div>

    )

}

export default RenderLeader;