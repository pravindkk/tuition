import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import VideoView from './Video'


const mod = (n, m) => ((n % m) + m) % m;

function ShowVideoComponent({ names }) {
    const params = useParams();
    useEffect(() => {
        // setTimeout(()=> {
        //     // console.log(names);
        // }, 2000)
    }, [])

    const [index, setIndex] = useState(0);
    // console.log(index);

    const forwards = useCallback(() => 
        setIndex(state => mod(state + 1, names.length))
    , [setIndex, names]);
    
    const backwards = useCallback(() => 
        setIndex(state => mod(state - 1, names.length))
    , [setIndex, names]);


  return (
    <>
        {names.length !== 0 
            ? (names[index].courseID === params.id) 
                ? <div className="video-component">
                    <h1>{names[index].title}</h1>
                    <VideoView videoId={names[index].id} />

                    <button className="backwards" onClick={backwards}>Backwards</button>
                    <button className="forwards" onClick={forwards}>Forwards</button>
                </div>
                : <div className="video-component">
                    <button className="backwards" onClick={backwards}>Backwards</button>
                    <button className="forwards" onClick={forwards}>Forwards</button>
                </div>
            : <div className="video-component" />
        }
        {/* hello
      <h1>{names[index].title}</h1> */}
      
    </>
  );
}

class ShowVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        this.loadData();
    }
    async loadData() {
        // console.log(this.props);
        // this.fetchData(this.props.names)
        setTimeout(() => {
            // console.log(this.props);
            this.setState({
                data: 1
            })
        }, 500);

    }


    render() {
        if (!this.state.data) {
            return <div />
        }
        return (
            <>
                <ShowVideoComponent names={this.props.names} />
            </>
        )
    }
}

export default ShowVideo