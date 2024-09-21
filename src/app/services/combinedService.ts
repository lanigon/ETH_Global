
import axios from 'axios';

const apiBaseUrl = 'http://localhost:8080';

// Wallet API service functions
export const createWallet = async (walletData: any) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/addwallet`, walletData);
        return response.data;
    } catch (error) {
        console.error("Error creating wallet:", error);
        throw error;
    }
};

export const getWalletByAddress = async (address: string) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/wallet/${address}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching wallet:", error);
        throw error;
    }
};

export const deleteWallet = async (address: string) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/wallet/${address}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting wallet:", error);
        throw error;
    }
};

// Prize API service functions
export const createPrize = async (prizeData: any) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/addPrize`, prizeData);
        return response.data;
    } catch (error) {
        console.error("Error creating prize:", error);
        throw error;
    }
};

export const updatePrize = async (prizeName: string, prizeData: any) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/prizes/${prizeName}`, prizeData);
        return response.data;
    } catch (error) {
        console.error("Error updating prize:", error);
        throw error;
    }
};

export const distributePrize = async () => {
    try {
        const response = await axios.get(`${apiBaseUrl}/distribute-prizes`);
        return response.data;
    } catch (error) {
        console.error("Error distributing prize:", error);
        throw error;
    }
};
