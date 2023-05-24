import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store.ts";
import {getPosts} from "../api/getPosts.ts";

const Posts = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getPosts({}))
    }, []);

    return <div>


    </div>;
};

export default Posts;
