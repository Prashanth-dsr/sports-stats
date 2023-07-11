import pMap, {pMapSkip} from 'p-map';
import got from 'got';

const sites = [
    'https://avajs.dev',
    'https://example.invalid',
    'https://github.com'
];

const mapper = async site => {
    try {
        const {requestUrl} = await got.head(site);
        return requestUrl;
    } catch {
        return pMapSkip;
    }
}

const result = await pMap(sites, mapper, {concurrency: 2});

console.log(result);