import React, {useState} from 'react';
import {usePromiseTracker} from "react-promise-tracker";
import ClipLoader from "react-spinners/ClipLoader";


export const Spinner = (props: any) => {
    const { promiseInProgress } = usePromiseTracker({area: props.area});
    let [color, setColor] = useState("#ffffff");

    return (
        <div>
            { promiseInProgress ?
                <div className="spinner">
                    Loading...
                    {/*<ClipLoader color={color} size={150} />*/}
                </div> : null

            })
        </div>
    );
};
