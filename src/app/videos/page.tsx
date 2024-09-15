export default function page() {
	return (
		<div className="flex flex-col items-center p-4">
			<video controls className="w-full max-w-lg">
				<source
					src="https://videos.pexels.com/video-files/11274341/11274341-uhd_2560_1440_25fps.mp4"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
			<video controls className="w-full max-w-lg">
				<source
					src="https://videos.pexels.com/video-files/5473806/5473806-uhd_2732_1440_25fps.mp4"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
		</div>
	);
}
