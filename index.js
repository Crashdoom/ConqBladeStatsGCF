const axios = require('axios');
const https = require('https');

const agent = new https.Agent({  
  rejectUnauthorized: false
});

async function getStats(ip, statsUrl) {
  console.log({
    msg: `Attempting to retrieve stats for ${ip} from ${statsUrl}`,
  });
  try {
    let source = axios.CancelToken.source();
    setTimeout(() => {
        source.cancel();
    }, 1250);
    const result = await axios.get(`https://${statsUrl}/Stats/RequestServerLoad?login_ip=${ip}`, { httpsAgent: agent, cancelToken: source.token });
    if (!result || !result.data) {
      throw new Error('Timed out or no data received');
    }
    const data = result.data;
    console.log({
      ok: true,
      msg: `Retrieved stats for ${ip} from ${statsUrl}`,
    });
    return { ip, online: data.data.current_user_count > 0, ...data };
  } catch (e) {
    console.error({
      err: e,
      msg: `Failed to fetch ${ip} from ${statsUrl}`,
      res: e.response && e.response.data,
    });
    return { ip, online: false, err: e.toString() };
  }
}

async function sendStatsInfo(res, endpoint, data) {
  let source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, 1250);
  try {
    const result = await axios({
      method: 'post',
      headers: {'Authorization': 'Bearer ADD_BEARER_TOKEN_HERE'},
      url: 'https://api.conqbladestats.com/internal/' + endpoint,
      data,
      cancelToken: source.token,
    });
    console.log(`[${endpoint}]: ${JSON.stringify({
      cfPost: result.status,
    })}`);
  } catch (e) {
    console.error(`[${endpoint}]: ${JSON.stringify({
      err: e,
      req: {
        method: 'post',
        headers: {'Authorization': 'Bearer REDACTED'},
        url: 'https://api.conqbladestats.com/internal/mygames',
        data,
        cancelToken: source.token,
      },
      res: e.response && e.response.data,
    })}`);
  }
}

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getStatsAPI = async (req, res) => {
  const [
    teutatis_eu3,
    sicania_eu2,
    crystalsea_eu1,
    asterion_na,
    steppes_ru,
    asia_pacific,
    asia_nova,
    booming_tournament,
  ] = await Promise.all([
    await getStats('188.42.197.20', '188.93.59.232:10043'),
    await getStats('92.38.155.28', '188.93.59.232:10043'),
    await getStats('185.30.179.64', '188.93.59.232:10043'),
    await getStats('209.205.124.58', '188.93.59.232:10043'),
    await getStats('188.93.59.231', '188.93.59.232:10043'),
    await getStats('159.138.36.201', '159.138.26.73:8002'),
    await getStats('159.138.48.80', '159.138.26.73:8002'),
    await getStats('159.138.133.200', '159.138.26.73:8002'),
  ]);
  await sendStatsInfo(res, 'mygames', {
    servers: {
      teutatis_eu3,
      sicania_eu2,
      crystalsea_eu1,
      asterion_na,
      steppes_ru,
    },
    last_updated: Date.now(),
  });
  await sendStatsInfo(res, 'booming', {
    servers: {
      asia_pacific,
      asia_nova,
      booming_tournament,
    },
    last_updated: Date.now(),
  });
  await res.status(200).send();
};