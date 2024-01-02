import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../firebase/setup';

const Home = (props) => {
    const [news, setNews] = useState([]);

    const addNews = async(data) => {
        const newDoc = doc(database, "News", `${data.url.substr(-10, 10)}`);
        try {
            await setDoc(newDoc, {
                title:data.title,
                description: data.description
            })
        } catch(err) {
            console.log(err)
        }
    }

    const API_KEY = "f4d4af9502de48e9aed823282e5c529a";

    const getNews = () => {
        fetch(`https://newsapi.org/v2/everything?q=${props.menu ? props.menu : "All"}&sortBy=popularity&apiKey=${API_KEY}`)
            .then(res => res.json())
            .then(json => {
                if (json.articles) {
                    setNews(json.articles);
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
            });
    };

    useEffect(() => {
        getNews();
    }, [props.menu]); 

    return (
        <div className='mt-20 p-5 grid grid-cols-4'>
            {news?.filter(data => data.title.includes(props.search)).map((data) => {
                return <>
                <Link onClick={() => addNews(data)} to="/details" state={{data:data}}>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg m-2">
                        <img className="w-full" src={data.urlToImage} alt="image not shown" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{data.title}</div>
                            <p className="text-gray-700 text-base">
                                {data.content}
                            </p>
                        </div>
                    </div>
                </Link>
                </>
            })}
        </div>
    );
};

export default Home;
