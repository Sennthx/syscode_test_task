import axios from 'axios';
import { performance } from 'perf_hooks';
import logger from '../../src/logger'

const API_URL = 'http://localhost:3000/students';
const TOTAL_REQUESTS = 10000;
const CONCURRENCY = 100;
const REQUEST_DELAY_MS = 50;

let completed = 0;
let failed = 0;

async function sendRequest(index) {
    try {
        await axios.post(API_URL, {
            name: `Student ${index}`,
            email: `student${index}@example.com`,
        });
        completed++;
    } catch (err) {
        failed++;
        logger.error(`Request ${index} failed:`, err.message);
    }
}

async function runLoadTest() {
    logger.info(`Starting load test(${TOTAL_REQUESTS} requests)...`);
    const startTime = performance.now();

    for (let i = 0; i < TOTAL_REQUESTS; i += CONCURRENCY) {
        const batch = [];
        for (let j = 0; j < CONCURRENCY && i + j < TOTAL_REQUESTS; j++) {
            batch.push(sendRequest(i + j));
        }
        await Promise.all(batch);
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY_MS));
        logger.info(`Progress: ${completed + failed}/${TOTAL_REQUESTS}`);
    }

    const endTime = performance.now();
    const totalSeconds = (endTime - startTime) / 1000;
    const requestsPerSecond = (completed / totalSeconds).toFixed(2);

    logger.info(`
    ========== RESULTS ==========
    Total requests: ${TOTAL_REQUESTS}
    Successful: ${completed}
    Failed: ${failed}
    Total time: ${totalSeconds.toFixed(2)}s
    Throughput: ${requestsPerSecond} req/s
    =============================
  `);
}

runLoadTest().catch(logger.error);