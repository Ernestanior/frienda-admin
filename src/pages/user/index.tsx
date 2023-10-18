import React, {FC} from "react";
import {useLoaderData} from "react-router-dom";
const User: FC = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <section>
            User
        </section>
    );
};

export default User;
