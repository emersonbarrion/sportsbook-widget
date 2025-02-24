import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [menu, setMenu] = useState([]);
    const [oddstable, setOddstable] = useState([]);
    const [selected, setSelected] = useState(1);
    
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const axiosInstance = axios.create({
                    baseURL: 'https://preprod-platformapi.song88.com/v1/sportsbook',
                    headers: {
                        "X-Api-Key": "8LKvrh6C2fe8mKXZ",
                        "X-Client-Id": "71bbe7d8-fd04-459c-6d8b-08d9354e5b64",
                        "X-Country-Code": "PH",
                        "X-Currency-Code": "INR",
                        "X-Language-Code": "EN",
                    }
                })
                const response = await axiosInstance.get('/sports?sportGroup=0')
                setMenu(response.data.result.sports.map((x: any) => ({id: x.sportId, name: x.sportName})))
            } catch (err) {
                console.log(err)
            }
        }
        
        fetchMenu()
        
    }, [])
    
    const fetchOddsTable = async (id: number) => {
        try {
            const axiosInstance = axios.create({
                baseURL: 'https://preprod-platformapi.song88.com/v1/sportsbook',
                headers: {
                    "X-Api-Key": "8LKvrh6C2fe8mKXZ",
                    "X-Client-Id": "71bbe7d8-fd04-459c-6d8b-08d9354e5b64",
                    "X-Country-Code": "PH",
                    "X-Currency-Code": "INR",
                    "X-Language-Code": "EN",
                }
            })
            const response = await axiosInstance.get(`/sports/topleaguefixtures?SportId=${id}`)
            setOddstable(response.data.result.fixtures.map((x: any) => x.fixtureName))
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        fetchOddsTable(1)
    }, [])
    
    const handleMenuClick = (id: number) => {
        fetchOddsTable(id)
        setSelected(id)
    }
    
    return (
        <>
            <div className="jmj-header"></div>
            <div className="jmj-content">
                <div className="jmj-menu">
                    {menu.map((item: { name: string, id: number }) => (
                        <div key={item.id} className={"jmj-menu-item " + (selected === item.id ? "selected" : "")}
                             onClick={() => handleMenuClick(item.id)}>{item.name}</div>
                    ))}
                </div>
                <div className="jmj-odds-table">
                    {oddstable.map(item => (
                        <div key={item} className="jmj-menu-item">{item}</div>
                    ))}
                </div>
                <div className="jmj-betslip">Betslip</div>
            </div>
        </>
    )
}

export default App
