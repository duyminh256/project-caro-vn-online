import React from "react";
import 'antd/dist/antd.css';

const ListOnline = (props) =>{
        const {history} = props
        return (
            <div className="container">
                <div className="row">
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">History</div>
                                <hr/>
                                <div className="messages">
                                    {history.map((move,index) => {
                                        const _id = index
                                        const status = move.key?`Bước ${index}: ${move.key}_Row: ${parseInt((move.pos/20 + 1),10)}, Col: ${parseInt((move.pos%20 + 1),10)}`:`Start game`
                                        return (
                                            <div key={_id}>{status}</div>
                                        )
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

  export default ListOnline
  