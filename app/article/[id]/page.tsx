export default function ArticlePage({params} : { params: {id: string}}) {
    return (
        <div>
          <h1>Article ID: {params.id}</h1>
        {/* 🥱 */}
        </div>
      );
}