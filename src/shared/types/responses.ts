interface EsrbRating {
  id: number;
  slug: string;
  name: string;
}

interface PlatformDetails {
  id: number;
  slug: string;
  name: string;
  image_background: string;
}

interface PlatformRequirements {
  minimum: string;
  recommended: string;
}

interface Platform {
  platform: PlatformDetails;
  released_at: string;
  requirements: PlatformRequirements;
}
interface Genre {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}
interface Screens {
  id: number;
  image: string;
}
interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  genres: Genre[];
  short_screenshots: Screens[];
  ratings: Record<string, unknown>;
  ratings_count: number;
  reviews_text_count: string;
  added: number;
  added_by_status: Record<string, unknown>;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  esrb_rating: EsrbRating;
  platforms: Platform[];
}

interface GamesApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Game[];
}
export type { GamesApiResponse, Game, Genre };
