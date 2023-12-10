import "./Disscussion.css"

const Disscussion = () => {
    return (
        <div className="disscussionbox roundedcorner">
            <div className="sendernamedisplay roundedcorner">

                <p>Chats</p>

                

            </div>
            <div className="writingandviewingarea roundedcorner">


                <div className="allmessage ">

                    <div className="Recivedmessages roundedcorner">
                        "hii how are you what are you doow are you what are you doow are you what are you doing"
                    </div>
                    <div className="sendedmessages roundedcorner">
                        "hii how are yow are you what are you doow are you what are you doow are you what are you doou what are you doing"
                    </div>



                </div>
                <div className="messagesendercontainer ">

                    <div className="messagesender">

                        <input type="text" className="textboxtoinput">

                        </input>
                        <button>
                            send
                        </button>

                    </div>


                </div>
            </div>

        </div>

    );

};

export default Disscussion;