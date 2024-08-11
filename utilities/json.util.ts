import * as path from 'path'
import * as fs from 'fs'

export default class JsonUtil {
    static async parseJsonFile(filePath: string): Promise<any> {
        try {
            const absolutePath = path.resolve(filePath);
            const fileContent = await fs.promises.readFile(absolutePath, 'utf-8'); 
            return JSON.parse(fileContent);
        }
        catch (error) {
            console.error('Error reading or parsing file:', error);
            throw error;
        }
    }

    static async filterByTag(filePath: string, tag: string): Promise<any> {
        try {
            const jsonData = await this.parseJsonFile(filePath);
            return jsonData.filter((item: any) => item.tag === tag);
        }
        catch(error) {
            console.error('Error filtering JSON data by tag:', error);
            throw error;
        }
    }
}