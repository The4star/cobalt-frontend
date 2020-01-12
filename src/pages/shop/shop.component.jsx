import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

// components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component'
import Spinner from '../../components/with-spinner/with-spinner.component'

// urls

import {localURL, productionURL} from '../../helpers/fetch-urls'

class ShopPage extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            collections: null
        }
    }

    componentDidMount = () => {
        this.getCollections()
    }

    getCollections = async () => {
        const response = await axios.get(`${process.env.NODE_ENV === 'production' ? productionURL : localURL}/data/collections`);
        const data = response.data;

        this.setState({collections: data});
    }
    
    render() {
        const { match } = this.props
        const { collections } = this.state
        return collections ? (
            
            <div className='shop-page'>
                <Switch>
                    <Route exact path={`${match.path}`} render={() => <CollectionsOverview collections={collections} />} />
                    <Route path={`${match.path}/:collectionName`} render={({match}) => <CollectionPage match={match} collections={collections} />} /> 
                </Switch>
            </div> 
            
        ) : (
            <Spinner />
        )
    }
};



export default ShopPage;