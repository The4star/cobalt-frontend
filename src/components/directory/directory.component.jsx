import React from 'react';
import axios from 'axios'

// components
import MenuItem from '../menu-item/menu-item.component'
import Spinner from '../../components/with-spinner/with-spinner.component'

// urls

import {localURL, productionURL } from '../../helpers/fetch-urls'
import './directory.styles.scss'

class Directory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            directories: null
        }
    }

    componentDidMount = () => {
        this.getDirectories()
    }

    getDirectories = async () => {
      console.log(localURL)
        const response = await axios.get(`${process.env.NODE_ENV === 'production' ? productionURL : localURL}/data/directories`);
        const data =  response.data
        this.setState({directories: data})
    }

    render() {
        const { directories } = this.state; 
        return directories ? (
            <div className='directory-menu'>
                {
                    directories.map(({_id, ...otherdirectoryProps}) => {
                        return <MenuItem key={_id} {...otherdirectoryProps}/>
                    })
                    
                } 
            </div>       
        ) : (
            <Spinner />
        )
    }
};


export default Directory;
