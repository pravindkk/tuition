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
    <div className="App">
        {/* {names.length !== 0 && names[index].courseID === params.id && (
            <div>
                <h1>{names[index].title}</h1>

                <button onClick={backwards}>Backwards</button>
                <button onClick={forwards}>Forwards</button>
            </div>
            
        )} */}
        {names.length !== 0 
            ? (names[index].courseID === params.id) 
                ? <div>
                    <h1>{names[index].title}</h1>
                    <VideoView videoId={names[index].id} />

                    <button onClick={backwards}>Backwards</button>
                    <button onClick={forwards}>Forwards</button>
                </div>
                : <div>
                    <button onClick={backwards}>Backwards</button>
                    <button onClick={forwards}>Forwards</button>
                </div>
            : <div>hello</div>
        }
        {/* hello
      <h1>{names[index].title}</h1> */}
      
    </div>
  );
}

// export default ShowVideo

// import React, { useState, useCallback } from "react";

// const mod = (n, m) => ((n % m) + m) % m;

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
        // const [index, setIndex] = useState(0);
        // console.log(index);

        // const forwards = useCallback(() => 
        //     setIndex(state => mod(state + 1, this.props.names.length))
        // , [setIndex, this.propsnames]);
        
        // const backwards = useCallback(() => 
        //     setIndex(state => mod(state - 1, this.props.names.length))
        // , [setIndex, names]);
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