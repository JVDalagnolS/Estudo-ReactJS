import React from "react";
import { useForm } from "react-hook-form";
import Api from "../../../Api";
import { getToken } from "../../../Auth";

export default function SearchBar(props){

    const {handleSubmit, register} = useForm();

    const onSubmit = (data) => {
        Api.get(
            `${props.path}/${data.search}`,
            {
                params:{},
                headers:{
                    Authorization: "Bearer " + getToken()
                }
            }
        )
        .then((response)=>{
            props.handle(response.data);
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Busca</label>
                    <input 
                        type="text"
                        className="form-control"
                        {...register('search')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor=""></label>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        pesquisar
                    </button>
                </div>
            </form>
        </div>
    );

}