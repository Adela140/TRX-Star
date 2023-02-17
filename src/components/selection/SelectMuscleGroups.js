import { useDispatch } from "react-redux";
import { setActiveTab, setMuscleGroups } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";
import { useEffect, useState } from "react";
import { DURATION, MUSCLES, MUSCLE_GROUPS } from "../utils/constants";
import SelectMultipleButton from "../utils/SelectMultipleButton";
import './style.scss'

const SelectMuscleGroups = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const muscleGroupKey = {
        "Core": "absCore",
        "Lower Body": "lowerBody",
        "Upper Body": "upperBody",
    };
    const muscleGroupOptions = [
        "Core",
        "Lower Body",
        "Upper Body",
    ];

    const clickHandler = (option) => {
        dispatch(setMuscleGroups(option));
    }

    useEffect(() => {
        dispatch(setActiveTab(MUSCLE_GROUPS));
    }, []);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

   
    return (
        <>
        <div className="category-div">
            PLEASE SELECT AT LEAST 
            ONE MUSCLE GROUP
        </div>
        <div className="container">
            <div className="left-arrow-div">
                <NavButtons prev={`/select/${DURATION}`}/>
            </div>
            <div className="options-div">
                {
                    muscleGroupOptions?.map((option) => {
                        return (
                            <SelectMultipleButton 
                                key={option} 
                                type={MUSCLE_GROUPS} 
                                option={option} 
                                width="8rem"
                                height='4rem'
                                fontSize='1rem'
                            />
                        )

                    })
                }
            </div>
            <div className="right-arrow-div">
                <NavButtons  next={`/select/${MUSCLES}`}/>
            </div>
        </div>
        </>
        //     <ul
        //         style={{
        //             display: "grid",
        //             placeItems: "center",
        //             justifyContent: "center",
        //             alignItems: "center",
        //             maxWidth: "25rem",
        //             width: "100%",
        //             padding: "0px",
        //             gridTemplateColumns: width > 768 ? 'repeat(3, 1fr)' : '1fr',
        //             gridGap: '16px'
        //         }}
        //     >
                
        //     </ul>
        //     {/* <SelectedOptions/> */}
        //     <div
        //         style={{
        //             display:"flex",
        //             placeItems: "center",
        //             justifyContent: "center",
        //             alignItems: "center",
        //             width:"150%",
        //         }}
                
        //         >
        //             <div
        //                 style={{
        //                     display:"flex",
        //                     placeItems: "center",
        //                     justifyContent: "center",
        //                     alignItems: "center",
        //                     width:"50%",
        //                 }} >
        //                 <NavButtons
        //                     prev={`/select/${DURATION}`}
        //                 />
        //             </div>

        //             <div
        //                 style={{
        //                     display:"flex",
        //                     placeItems: "center",
        //                     justifyContent: "center",
        //                     alignItems: "center",
        //                     width:"50%",
        //                 }}>
        //                 <NavButtons
        //                     next={`/select/${MUSCLES}`}
        //                 />
        //             </div>
               
        //     </div>
        //     {/* <div>   
        //         <button> 
                    
        //         </button>
        //     </div> */}
        // </div>
    )
}

export default SelectMuscleGroups;