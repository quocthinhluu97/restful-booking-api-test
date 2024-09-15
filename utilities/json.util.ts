import * as path from 'path'
import * as fs from 'fs'

export default class JsonUtil {
    /**
     * Asynchronously reads and parses a JSON file.
     *
     * @param filePath - The relative or absolute path to the JSON file.
     * @returns A promise that resolves with the parsed JSON content.
     * @throws Will throw an error if the file cannot be read or if parsing fails.
    */
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

    /**
     * Asynchronously reads a JSON file and filters its content by a specified tag.
     *
     * @param filePath - The relative or absolute path to the JSON file.
     * @param tag - The tag used to filter the JSON objects.
     * @returns A promise that resolves with an array of filtered JSON objects.
     * @throws Will throw an error if the file cannot be read, parsed, or if filtering fails.
    */
    static async filterByTag(filePath: string, tag: string): Promise<any> {
        try {
            const jsonData = await this.parseJsonFile(filePath);
            return jsonData.filter((item: any) => item.tag === tag);
        }
        catch (error) {
            console.error('Error filtering JSON data by tag:', error);
            throw error;
        }
    }

    static async read<T>(file: string): Promise<T | undefined> {
        let data: string | undefined;
        try {
            data = await fs.promises.readFile(file, 'utf-8');
            return JSON.parse(data) as T;
        } catch(err) {
            console.log("Error reading file: ", err);
            return undefined;
        }
    }

    static async write<T>(file: string, data: T): Promise<void> {
        try {
            const jsonData = JSON.stringify(data, null, 2);
            await fs.promises.writeFile(file, jsonData, 'utf-8');
        } catch(err) {
            console.log("Error writing file: ", err);
            return undefined;
        }
    }
}