import PingApi from "api/ping.api";
import { describe, it, expect} from "vitest";

describe('Ping test', () => {
    const pingApi = new PingApi();

    it('Should return 201', async () => {
        const response = await pingApi.pingCheck();
        expect(response.status).toBe(201);
    })
})