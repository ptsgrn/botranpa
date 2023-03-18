<!--
 Copyright (c) 2023 Patsagorn Y.
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
<div
	class="prose 
  prose-h1:font-display prose-h1:text-2xl prose-h1:font-bold
  prose-h2:font-bold     prose-h2:font-display   prose-h2:text-xl prose-h2:mt-5
  prose-h3:font-bold     prose-h3:font-display   prose-h3:text-lg prose-h3:mt-5
  prose-p:font-serif     prose-pmy-2
  prose-ul:font-serif    prose-ul:ml-5           prose-ul:mt-2    prose-ul:mb-2
  prose-a:link           prose-a:link-hover      prose-a:link-primary
  "
>
	<h1>บอตร้านป้า: แชตบอตรับออเดอร์ร้านอาหารตามสั่งโดยใช้ภาษาธรรมชาติ</h1>

	<h2>เกี่ยวกับโครงการอย่างย่อ</h2>
	<p>
		ร้านอาหารตามสั่งเป็นประเภทของร้านอาหารที่ลูกค้าสามารถสั่งเมนูได้ตามต้องการ
		และสามารถพบได้ทั่วไปในประเทศไทย ในร้านที่เป็นที่นิยมอาจมีการสั่งอาหารผ่านช่องทางอื่น
		แชตทางแชตบนสื่อสังคมต่าง ๆ หรือแม้กระทั่งโทรศัพท์ โดยในโครงงานนี้ใช้เทคนิค String Matching
		สำหรับการแยกชื่อเมนูออกมาจากข้อความที่ผู้ใช้ส่ง เทียบกับเมนูและวัตถุดิบที่มีอยู่ในร้าน
		โดยร้านค้าสามารถตั้งค่าเมนูและวัตถุดิบที่มีอยู่ในร้านได้
		เมื่อผู้ใช้สั่งอาหารและยืนยันเรียบร้อยแล้ว ร้านค้าจะได้รับคำสั่งซื้อแสดงแสดงบนเว็บไซต์
		แต่อย่างไรก็ตาม ความฉลาดของบอตยังต้องปรับปรุงและต้องมีการพัฒนาต่อยอดอีกมาก
		เพื่อให้สามารถใช้งานได้จริงในระดับที่มีประสิทธิภาพ และเป็นประโยชน์ต่อร้านค้า
	</p>

	<h2>วิธีการใช้งาน</h2>
	<p>
		อ่านวิธีการใช้งานและปรับตั้งค่าได้ที่<a href="/manual">หน้าคู่มือการใช้งาน</a>
	</p>

	<h2>ผู้พัฒนาและครูที่ปรึกษา</h2>
	<!-- flexbox albatross -->
	<div class="flex flex-wrap gap-4 mt-4">
		<div
			class="card w-60 bg-gray-800 shadow-xl min-w-[clamp(0px,999*(600px-100%), 100%)] flex-grow max-w-xs
  "
		>
			<figure
				class="px-10 pt-10
      "
			>
				<img src="/001.jpeg" alt="นายพัสกร ยืนยง" class="rounded-xl" />
			</figure>
			<div class="card-body items-center text-center">
				<h2 class="card-title">นายพัสกร&nbsp;ยืนยง</h2>
				<p>
					ผู้พัฒนาโครงงาน นักเรียนชั้นมัธยมศึกษาปีที่ 5 โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย
					บุรีรัมย์
				</p>
			</div>
		</div>

		<div
			class="card w-60 bg-gray-800 shadow-xl min-w-[clamp(0px,999*(600px-100%), 100%)] flex-grow max-w-xs"
		>
			<figure class="px-10 pt-10">
				<img src="/002.JPG" alt="นางสาวช่อเพชร ธนามีชัย" class="rounded-xl" />
			</figure>
			<div class="card-body items-center text-center">
				<h2 class="card-title">นางสาวช่อเพชร&nbsp;ธนามีชัย</h2>
				<p>
					ผู้พัฒนาโครงงาน นักเรียนชั้นมัธยมศึกษาปีที่ 5 โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย
					บุรีรัมย์
				</p>
			</div>
		</div>

		<div
			class="card w-60 bg-gray-800 shadow-xl min-w-[clamp(0px,999*(600px-100%), 100%)] flex-grow max-w-xs"
		>
			<figure class="px-10 pt-10">
				<img src="/003.png" alt="นายเอกชัย วัฒนไชย" class="rounded-xl" />
			</figure>
			<div class="card-body items-center text-center">
				<h2 class="card-title">นายเอกชัย&nbsp;วัฒนไชย</h2>
				<p>ครูที่ปรึกษา โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์</p>
			</div>
		</div>
	</div>
	<h2>คู่มือการใช้งาน</h2>
	<p>
		อ่านวิธีการใช้งานและปรับตั้งค่าได้ที่<a href="/manual">หน้าคู่มือการใช้งาน</a>
	</p>
	<h2>ข้อตกลงการใช้ซอร์ฟแวร์ และสัญญาอนุญาตของโปรแกรม</h2>
	<p>
		อ่านได้ที่<a href="/disclaimer-and-license">ข้อตกลงการใช้ซอร์ฟแวร์ และสัญญาอนุญาตของโปรแกรม</a>
	</p>
</div>
