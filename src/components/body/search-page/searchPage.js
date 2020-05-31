import React, {useState, useEffect} from 'react';
import './../../../common/style.css';
import SearchItem from './searchItem';
import {connect} from 'react-redux';
import callApi from '../../../common/callApi';


function SearchPage(props) {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await callApi(`products`, 'get', null).then(res=> {
                if(res && res.data.length>0) {
                    setProducts([...res.data]);
                } else setProducts([]);
            })
        }
        fetchData();
    }, []);

    useEffect(() => {
        const q = props.q
            .toUpperCase()
            .split(' ')
            .filter(x => x!== '')
            .join('');
        const category = props.category;
        let arrFilter = [];
        const fetchData = async () => {
            if (category === 'all') {
                await callApi(`products`, 'get', null).then(res => {
                    if(res &&res.data.length>0) {
                        let datas = [...res.data];
                        datas.filter(item => {
                            let charName = item.name
                                 .toUpperCase()
                                 .split(' ')
                                 .filter(x => x!=='')
                                 .join('');
                            if(charName.includes(q)) arrFilter.push(item);
                            return [...arrFilter];
                        });
                        setProducts(arrFilter);
                    } else setProducts([]);
                })
            } else if (category === 'hotdeal') {
                await callApi(`products?hotdeal=${true}`, 'get', null).then(res => {
                    if(res &&res.data.length>0) {
                        let datas = [...res.data];
                        datas.filter(item => {
                            let charName = item.name
                                 .toUpperCase()
                                 .split(' ')
                                 .filter(x => x!=='')
                                 .join('');
                            if(charName.includes(q)) arrFilter.push(item);
                            return [...arrFilter];
                        });
                        setProducts(arrFilter);
                    } else setProducts([]);
                })
            } 
            else {
                await callApi(`products?category=${category}`, 'get', null).then(res => {
                    if(res &&res.data.length>0) {
                        let datas = [...res.data];
                        datas.filter(item => {
                            let charName = item.name
                                 .toUpperCase()
                                 .split(' ')
                                 .filter(x => x!=='')
                                 .join('');
                            if(charName.includes(q)) arrFilter.push(item);
                            return [...arrFilter];
                        });
                        setProducts(arrFilter);
                    } else setProducts([]);
                })
            }
        }
        fetchData();
    },[props]); 

    return (
        <div className="container">
            <div className="row">
				<div className="col-12">
					<h2
						className="text-uppercase my-4"
						style={{
							fontWeight: '600',
							textShadow: '4px 4px 7px rgba(150, 152, 150, 1)'
						}}
					>
						Results
					</h2>
				</div>
				<div className="col-12">
					<div className="hotdeal">
                        <SearchItem products={products}/>
					</div>
				</div>
			</div>
        </div>
    );
}

const mapStateToProps = state => {
    console.log('state', state)
    return {
        q: state.search.q,
        category: state.search.category
    }
}

export default connect(mapStateToProps, null)(SearchPage);