import type { DataProvider } from "@refinedev/core";
import { v4 as uuidv4 } from "uuid";
import mockData from "../mocks.json";

export type MockDataShape = {
  [resourceName: string]: Array<{
    id: string;
    [field: string]: string | number | null | Array<any>;
  }>;
};

export const createDataProvider = (): DataProvider => {
  const data: MockDataShape = mockData as any;

  return {
    getList: async ({ resource, pagination, filters, sorters }) => {
      let items = [...(data[resource] || [])];

      // Handle filters
      if (filters) {
        items = items.filter((item) => {
          return filters.every((filter) => {
            if (!filter.value) return true;

            const value = "field" in filter ? item[filter.field] : null;

            switch (filter.operator) {
              case "eq":
                return value === filter.value;
              case "ne":
                return value !== filter.value;
              case "lt":
                return value && value < filter.value;
              case "gt":
                return value && value > filter.value;
              case "lte":
                return value && value <= filter.value;
              case "gte":
                return value && value >= filter.value;
              case "contains":
                return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
              default:
                return true;
            }
          });
        });
      }

      // Handle sorting
      if (sorters && sorters.length > 0) {
        items = items.sort((a, b) => {
          for (const sorter of sorters) {
            const result =
              String(a[sorter.field]).localeCompare(String(b[sorter.field])) * (sorter.order === "desc" ? -1 : 1);

            if (result !== 0) return result;
          }
          return 0;
        });
      }

      // Handle pagination
      const total = items.length;
      if (pagination) {
        const start = ((pagination.current ?? 1) - 1) * (pagination.pageSize ?? 10);
        const end = start + (pagination.pageSize ?? 10);
        items = items.slice(start, end);
      }

      return {
        data: items as any,
        total,
      };
    },

    getOne: async ({ resource, id }) => {
      const item = (data[resource] || []).find((item) => String(item.id) === String(id));

      if (!item) {
        throw new Error(`Item with id "${id}" not found in "${resource}"`);
      }

      return {
        data: item as any,
      };
    },

    create: async ({ resource, variables }) => {
      const newItem = {
        ...(variables as any),
        id: (variables as any).id || uuidv4(),
      };

      data[resource].push(newItem);

      return {
        data: newItem,
      };
    },

    update: async ({ resource, id, variables }) => {
      const index = data[resource].findIndex((item) => String(item.id) === String(id));

      if (index === -1) {
        throw new Error(`Item with id "${id}" not found in "${resource}"`);
      }

      const updatedItem = {
        ...data[resource][index],
        ...variables,
      };

      data[resource][index] = updatedItem;

      return {
        data: updatedItem as any,
      };
    },

    deleteOne: async ({ resource, id }) => {
      const index = data[resource].findIndex((item) => String(item.id) === String(id));

      if (index === -1) {
        throw new Error(`Item with id "${id}" not found in "${resource}"`);
      }

      const deletedItem = data[resource][index];
      data[resource].splice(index, 1);

      return {
        data: deletedItem as any,
      };
    },

    getMany: async ({ resource, ids }) => {
      const items = (data[resource] || []).filter((item) => ids.map((id) => String(id)).includes(String(item.id)));

      return {
        data: items as any,
      };
    },

    getApiUrl: () => "",

    custom: async () => ({
      data: {} as any,
    }),
  };
};
