import { GithubRepo } from '../../models/GithubRepo';
import React, { Component } from 'react';
import { getPinnedRepos } from '../../services/github/github-service';
import './OpenSourceList.css';

const GithubRepoCard = ({ repo }) => (
    <div className='GithubRepoCard'>
        <a href={repo.url} className='GithubRepoCard-url'>
            <h4 className='GithubRepoCard-title'>{repo.name}</h4>
            <p className='GithubRepoCard-description text-gray'>{repo.description}</p>
            <ul className='GithubRepoCard-items'>
                {repo.languages.map((language, index) => (
                    <li key={index}>
                        <span className='badge' style={{ backgroundColor: language.color }}>{language.name}</span>
                    </li>
                ))}
                <li className='text-gray'>
                    <i className='GithubRepoCard-icon fa fa-star' aria-hidden='true'></i>
                    <span>{repo.stargazersCount}</span>
                </li>
                <li className='text-gray'>
                    <i className='GithubRepoCard-icon fa fa-code-fork' aria-hidden='true'></i>
                    <span>{repo.forksCount}</span>
                </li>
            </ul>
        </a>
    </div>
);

export class OpenSourceList extends Component {

    state = {
        pinnedRepos: []
    }

    componentDidMount() {
        this.loadRepos();
    }

    render() {
        const pinnedRepos = this.state.pinnedRepos;
        return (
            <div className='OpenSourceList activity-section clearfix'>
                <h3 className='OpenSourceList-title'>Open Source Projects I'm working on</h3>
                {pinnedRepos.map(this.renderCard.bind(this))}
            </div>
        )
    }

    renderCard(repo: GithubRepo, index: Number) {
        return (
            <div key={index} className='col-md-4'>
                <GithubRepoCard repo={repo} />
            </div>
        )
    }

    async loadRepos() {
        const pinnedRepos = await getPinnedRepos(this.props.username);
        this.setState({ pinnedRepos });
    }
}