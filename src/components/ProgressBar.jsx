const ProgressBar=({progress})=>{
    return(
        <div className="w-full bg-gray-200 h-2 rounded mt-3">
            <div className="bg-green-500 h-2 rounded" style={{width:`${progress}%`}}/>
        </div>
    )
};

export default ProgressBar;