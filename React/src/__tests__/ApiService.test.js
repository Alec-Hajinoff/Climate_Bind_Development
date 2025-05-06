import { fetchPremiumPayout } from "../ApiService";

describe("ApiService", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchPremiumPayout", () => {
    it("should fetch premium payout data successfully", async () => {
      const mockData = { premium: 100, payout: 1000 };
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockData),
        })
      );

      const result = await fetchPremiumPayout("2000", "flood");

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8001/Climate_Bind_Development/payout_premium.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            postcode: "2000",
            event: "flood"
          })
        }
      );
    });

    it("should handle error", async () => {
      global.fetch.mockImplementationOnce(() =>
        Promise.reject(new Error("Network error"))
      );

      await expect(fetchPremiumPayout("2000", "flood")).rejects.toThrow();
    });
  });
});