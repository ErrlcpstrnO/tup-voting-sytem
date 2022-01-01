import apiClient from ".";
import transformParamsToUrl from "../helpers/paramsToUrl.helpers";

type ElectionLogo = {
  id: number;
  public_id: string;
  url: string;
  service: string;
};

export interface Election {
  id: number;
  slug: string;
  title: string;
  description: string;
  start_date: string;
  close_date: string;
  organization_id: number;
  logo: ElectionLogo;
}

export interface GetElectionDto {
  orgId?: number;
  search?: string;
  order?: any;
  page?: number;
  take?: number;
  withArchive?: boolean;
}

export type CreateElectionDto = {
  slug: string;
  title: string;
  description: string;
  start_date: string;
  close_date: string;
  organization_id: number;
  logo: File;
};

export type UpdateElectionDto = {
  id: number;
  slug: string;
  title: string;
  description: string;
  start_date: string;
  close_date: string;
  organization_id: number;
  logo: File;
};

const url = "/api/v1/election";

const electionServices = {
  async getAll(query: GetElectionDto) {
    return (await apiClient.get(`${url}/${transformParamsToUrl(query)}`)).data;
  },
  async getById(id: string) {
    return (await apiClient.get(`${url}/${id}`)).data;
  },

  async getBySlug(slug: string) {
    return (await apiClient.get(`${url}/slug/${slug}`)).data;
  },

  async isExistBySlug(slug: string) {
    return (await apiClient.get(`${url}/exist/${slug}`)).data;
  },

  async create(body: CreateElectionDto) {
    const formData = new FormData();

    console.log("Body Test", body);

    formData.append("slug", body.slug);
    formData.append("title", body.title);
    formData.append("description", body.description);
    formData.append("start_date", body.start_date);
    formData.append("close_date", body.close_date);
    formData.append("organization_id", body.organization_id.toString());
    formData.append("logo", body.logo);

    return (
      await apiClient.post(`${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  },

  async update(body: UpdateElectionDto) {
    const formData = new FormData();

    formData.append("id", body.id.toString());
    formData.append("slug", body.slug);
    formData.append("title", body.title);
    formData.append("description", body.description);
    formData.append("start_date", body.start_date);
    formData.append("close_date", body.close_date);
    formData.append("organization_id", body.organization_id.toString());
    formData.append("logo", body.logo);

    return (
      await apiClient.put(`${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  },

  async archive(id: string) {
    return (await apiClient.put(`${url}/archive/${id}`)).data;
  },

  async unarchive(id: string) {
    return (await apiClient.put(`${url}/${id}`)).data;
  },

  async restore(id: string) {
    return (await apiClient.put(`${url}/restore/${id}`)).data;
  },

  async delete(id: string) {
    return (await apiClient.delete(`${url}/${id}`)).data;
  },
};

export default electionServices;
