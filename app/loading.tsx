import LoadingComponent from "./(website)/_components/loadingComponent";

export default function Loading() {
  return (
    <main className="opal-grid flex min-h-screen items-center justify-center bg-[#0b0b0c] px-6">
      <LoadingComponent fullPage label="Opening Opal" />
    </main>
  );
}
