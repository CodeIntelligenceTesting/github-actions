import {RestEndpointMethodTypes} from '@octokit/rest';

export type PullRequest =
    RestEndpointMethodTypes['pulls']['get']['response']['data'];
